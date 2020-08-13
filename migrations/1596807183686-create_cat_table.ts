import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCatTable1596807183686 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'cats',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
        
      }, {
        name: 'name',
        type: 'text',
      }, {
        name: 'age',
        type: 'int',
      }, {
        name: 'breed',
        type: 'text',
      }],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cats");
  }

}
