-- CreateTable
CREATE TABLE "CompletedHabitHistory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "Category" NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "weeklyDays" INTEGER[],
    "startDay" TIMESTAMP(3) NOT NULL,
    "completedDay" TIMESTAMP(3) NOT NULL,
    "plannedDays" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompletedHabitHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompletedHabitHistory" ADD CONSTRAINT "CompletedHabitHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
