import { Controller, Get } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { StatisticsService } from './statistics.service'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Auth('ADMIN')
	@Get('/registrations-by-month')
	getRegistrationsByMonth() {
		return this.statisticsService.getUserRegistrationsByMonth()
	}

	@Auth('ADMIN')
	@Get('/numbers')
	getNumbers() {
		return this.statisticsService.getNumbers()
	}

	@Auth('ADMIN')
	@Get('/count-by-country')
	getCountByCountry() {
		return this.statisticsService.getUserCountByCountry()
	}
}
