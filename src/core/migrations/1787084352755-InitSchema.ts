import { type MigrationInterface, type QueryRunner } from "typeorm";

export class InitSchema1787084352755 implements MigrationInterface {
    name = 'InitSchema1787084352755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "about_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4035d246500d197565c693550e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."musician_entity_instrument_enum" AS ENUM('Guitar', 'Vocal', 'Drum', 'Bass', 'Synth')`);
        await queryRunner.query(`CREATE TABLE "musician_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "surname" character varying NOT NULL, "instrument" "public"."musician_entity_instrument_enum" NOT NULL, "bio" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dfe996155b08ac2644da163ae45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "releaseDate" TIMESTAMP NOT NULL, "coverImageUrl" character varying NOT NULL, "description" text NOT NULL, "trackList" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_319a74c2085b42849b15412a3bf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "album_entity"`);
        await queryRunner.query(`DROP TABLE "musician_entity"`);
        await queryRunner.query(`DROP TYPE "public"."musician_entity_instrument_enum"`);
        await queryRunner.query(`DROP TABLE "about_entity"`);
    }

}
