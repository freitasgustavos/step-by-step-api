-- CreateEnum
CREATE TYPE "public"."SubmissionStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."Submission" (
    "id" TEXT NOT NULL,
    "status" "public"."SubmissionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "current_step" INTEGER NOT NULL DEFAULT 1,
    "form_data" JSONB,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);
