import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createPhotoTable1597053105806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'photos',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',

            }, {
                name: 'url',
                type: 'text',
            }, {
                name: 'cat_id',
                type: 'int',
            }],
        }), true);

        await queryRunner.createForeignKey('photos', new TableForeignKey({
            columnNames: ['cat_id'],
            referencedTableName: 'cats',
            referencedColumnNames: ['id'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("photos");
    }

}
