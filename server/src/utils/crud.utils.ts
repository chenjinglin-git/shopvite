import { HttpException, HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
interface Paging {
  search: any;
  limit: string;
  page: string;
}
export class Crud {
  constructor(private readonly Entity, private dataSource: DataSource) {}
  FindAll = async (query: Paging, join?: string) => {
    const search = query.search || '{}';
    const limit = Number(query.limit) || 10;
    const page = (Number(query.page) - 1) * limit || 0;
    let data;
    if (join) {
      data = await this.dataSource.manager
        .createQueryBuilder(this.Entity, 'entity')
        .leftJoinAndSelect(join, 'children')
        .where(JSON.parse(search))
        .skip(page)
        .take(limit)
        .getMany();
    } else {
      data = await this.dataSource.manager
        .createQueryBuilder(this.Entity, 'entity')
        .where(JSON.parse(search))
        .skip(page)
        .take(limit)
        .getMany();
    }
    const totals = await this.dataSource.manager
      .createQueryBuilder(this.Entity, 'entity')
      .where(JSON.parse(search))
      .getCount();
    const lastpage = Math.ceil(totals / limit);
    return {
      total: totals,
      data: data,
      lastpage: lastpage,
      page: page + 1,
    };
  };
  create = async (body: any) => {
    const data = await this.dataSource.manager
      .createQueryBuilder()
      .insert()
      .into(this.Entity)
      .values(body)
      .execute();
    if (data.raw.affectedRows > 0) {
      return data;
    } else {
      return new HttpException('创建失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
  update = async (body: any) => {
    const data = await this.dataSource.manager
      .createQueryBuilder()
      .update(this.Entity)
      .set(body)
      .where('userid=:userid', { userid: body.userid })
      .execute();
    if (data.affected > 0) {
      return data;
    } else {
      return new HttpException('修改失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  delete = async (id: string) => {
    const data = await this.dataSource.manager.findOneBy(this.Entity, {
      id: id,
    });
    if (data === null) {
      return new HttpException('删除失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.dataSource.manager.remove(data);
    return data;
  };
}
