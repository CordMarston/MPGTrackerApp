-- CreateTable
CREATE TABLE "CarMakes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CarMakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModels" (
    "id" SERIAL NOT NULL,
    "make_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "series" TEXT,

    CONSTRAINT "CarModels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "make_id" INTEGER NOT NULL,
    "model_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "miles" DECIMAL(9,2) NOT NULL,
    "gallons" DECIMAL(9,2) NOT NULL,
    "cost" DECIMAL(9,2) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarModels" ADD CONSTRAINT "CarModels_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "CarMakes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "CarMakes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "CarModels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
