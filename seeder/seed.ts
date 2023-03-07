import { faker } from '@faker-js/faker'
import { PrismaClient, Product } from '@prisma/client'
import * as dotenv from 'dotenv'
import { slugify } from 'src/utils/generate-slug'
import { getRandomNumber } from 'src/utils/random-number'

dotenv.config()
const prisma = new PrismaClient()

const createProducts = async (quantity: number) => {
	const products: Product[] = []

	for (let i = 0; i < quantity; i++) {
		const productName = faker.commerce.productName()
		const categoryName = faker.commerce.department()
		const product = await prisma.product.create({
			data: {
				name: productName,
				slug: slugify(productName),
				price: +faker.commerce.price(10, 999, 0),
				images: Array.from({ length: getRandomNumber(2, 6) }).map(() =>
					faker.image.imageUrl(),
				),
				descriptios: faker.commerce.productDescription(),
			},
		})
	}

	console.log(`Created ${products.length} products`)
}

async function main() {
	console.log('start seeding...')
	await createProducts(10)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
