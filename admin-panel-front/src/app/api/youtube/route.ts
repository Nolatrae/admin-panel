import youtubeService from '@/services/youtube.service'

export async function GET() {
	const result = await youtubeService.parseFirstVideo('REDGroupPlus')
	return Response.json(result)
}
