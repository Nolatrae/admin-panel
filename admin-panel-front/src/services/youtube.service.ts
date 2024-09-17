import axios from 'axios'

export interface IYoutubeResponse {
	title: string
	videoId: string
	thumbnail: string
}

class YoutubeService {
	private getString(initialText: string, start: string, end: string) {
		const from = initialText.indexOf(start)
		const to = initialText.indexOf(end)
		return initialText.substring(from, to).replace(start, '')
	}

	async parseFirstVideo(name: string): Promise<IYoutubeResponse> {
		const data = await axios.get(`https://www.youtube.com/@${name}/videos`)
		const result = data.data

		const title = this.getString(
			result,
			'"title":{"runs":[{"text":"',
			'"}],"accessibility":'
		)
		const videoId = this.getString(
			result,
			'"videoRenderer":{"videoId":"',
			'","thumbnail":'
		)
		const thumbnail = this.getString(
			result,
			'{"thumbnails":[{"url":"',
			'","width"'
		)

		return {
			title,
			videoId,
			thumbnail,
		}
	}
}

export default new YoutubeService()
