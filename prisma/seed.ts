import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { carMakesModels } from './data';

async function seed() {
    try {
        await prisma.carModels.deleteMany();
        console.log('Car Models Deleted');
        await prisma.carMakes.deleteMany();
        console.log('Car Makes Deleted');
        

        const uniqueMakes = carMakesModels.filter((v,i,a)=>a.findIndex(v2=>(v2.make===v.make))===i);
        for(const make of uniqueMakes) {
          let models = carMakesModels.filter(car => car.make == make.make);
          let modelsRenamed = models.map(model => {
            return {
              name: model.model
            }
          })

          const cars = await prisma.carMakes.create({
            data: {
              name: make.make,
              models: {
                createMany: {
                  data: modelsRenamed
                }
              }
            }
          });
          
        }

        console.log('Car Makes & ModelsAdded');

    } catch (e) {
        console.error(e);
        process.exit(1);
      } finally {
        await prisma.$disconnect();
      }
    };
    
    seed();