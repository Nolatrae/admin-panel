import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { SettingsService } from './settings.service'

@Controller('settings')
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {}

	@Auth('ADMIN')
	@Get(':key')
	getSetting(@Param('key') key: string) {
		return this.settingsService.getSettingByKey(key)
	}

	@Auth('ADMIN')
	@Post()
	setSetting(@Body() settingData: { key: string; value: string }) {
		return this.settingsService.setSetting(settingData.key, settingData.value)
	}
}
