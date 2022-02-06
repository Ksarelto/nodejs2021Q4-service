import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationFile1643654198362 implements MigrationInterface {
  name = 'MigrationFile1643654198362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ent_board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_b91ed034fb192195045488a2f9a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ent_column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "boardId" uuid, CONSTRAINT "PK_7b5b71c88c13f5670c1b783bbea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ent_task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "column_id" uuid, "boardIdId" uuid, "userIdId" uuid, CONSTRAINT "PK_7022217638a13857c78f36d2529" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ent_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_31554b950f0d538a9f15e10422e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ent_column" ADD CONSTRAINT "FK_038a52f5172c404602ea2061fc2" FOREIGN KEY ("boardId") REFERENCES "ent_board"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ent_task" ADD CONSTRAINT "FK_6c79276428eec4f7718e19d264e" FOREIGN KEY ("boardIdId") REFERENCES "ent_board"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ent_task" ADD CONSTRAINT "FK_a59006507206a4c579dbf101e39" FOREIGN KEY ("userIdId") REFERENCES "ent_user"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ent_task" DROP CONSTRAINT "FK_a59006507206a4c579dbf101e39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ent_task" DROP CONSTRAINT "FK_6c79276428eec4f7718e19d264e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ent_column" DROP CONSTRAINT "FK_038a52f5172c404602ea2061fc2"`,
    );
    await queryRunner.query(`DROP TABLE "ent_user"`);
    await queryRunner.query(`DROP TABLE "ent_task"`);
    await queryRunner.query(`DROP TABLE "ent_column"`);
    await queryRunner.query(`DROP TABLE "ent_board"`);
  }
}
