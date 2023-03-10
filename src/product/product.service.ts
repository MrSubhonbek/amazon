import { faker } from '@faker-js/faker'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationsService } from 'src/paginations/paginations.service'
import { PrismaService } from 'src/prisma.service'
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './dto/product.dto'
import {
	productReturnObject,
	productReturnObjectFullest,
} from './return-product.object'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private pagination: PaginationsService,
	) {}

	async getAll(dto: GetAllProductDto = {}) {
		const { sort, searchTerm } = dto

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		if (sort === EnumProductSort.LOW_PRICE) prismaSort.push({ price: 'asc' })
		else if (sort === EnumProductSort.HIGH_PRISE)
			prismaSort.push({ price: 'desc' })
		else if (sort === EnumProductSort.OLDEST)
			prismaSort.push({ createdAt: 'asc' })
		else prismaSort.push({ createdAt: 'desc' })

		const prismaSearchTerm: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							category: {
								name: {
									contains: searchTerm,
									mode: 'insensitive',
								},
							},
						},
						{
							name: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
						{
							descriptios: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
					],
			  }
			: {}

		const { perPage, skip } = this.pagination.getPagination(dto)

		const product = await this.prisma.product.findMany({
			where: prismaSearchTerm,
			orderBy: prismaSort,
			skip,
			take: perPage,
		})

		return {
			product,
			length: await this.prisma.product.count({
				where: prismaSearchTerm,
			}),
		}
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id,
			},
			select: productReturnObjectFullest,
		})
		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug,
			},
			select: productReturnObjectFullest,
		})
		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async byCategory(categorySlug: string) {
		const product = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug,
				},
			},
			select: productReturnObjectFullest,
		})
		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async getSimilar(id: number) {
		const currentProduct = await this.byId(id)

		if (!currentProduct)
			throw new NotFoundException('Current product not found!')
		const product = await this.prisma.product.findMany({
			where: {
				category: {
					slug: currentProduct.category.name,
				},
				NOT: {
					id: currentProduct.id,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: productReturnObject,
		})
		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async create() {
		const product = await this.prisma.product.create({
			data: {
				descriptios: '',
				name: '',
				price: 0,
				slug: '',
			},
		})
		return product.id
	}

	async update(id: number, dto: ProductDto) {
		const { categoryId, images, name, price, descriptios } = dto
		return this.prisma.product.update({
			where: {
				id,
			},
			data: {
				category: {
					connect: {
						id: categoryId,
					},
				},
				name,
				descriptios,
				images,
				price,
				slug: faker.helpers.slugify(dto.name).toLocaleLowerCase(),
			},
		})
	}

	async delete(id: number) {
		return this.prisma.product.delete({
			where: {
				id,
			},
		})
	}
}
