-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "enrolled" INTEGER NOT NULL DEFAULT 0,
    "maxEnrolled" INTEGER NOT NULL DEFAULT 50,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "days" INTEGER[],

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "days" INTEGER[],

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
