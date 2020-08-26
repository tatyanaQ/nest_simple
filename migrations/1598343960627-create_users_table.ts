import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsersTable1598343960627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }, {
        name: 'username',
        type: 'varchar(32)',
        isUnique: true,
      }, {
        name: 'role',
        type: 'text',
      }, {
        name: 'password',
        type: 'text',
        isNullable: true,
      }],
      
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
