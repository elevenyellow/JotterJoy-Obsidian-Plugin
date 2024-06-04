import { requestUrl } from 'obsidian'

export class JotterJoyApi {
	async fetchTags(url: string, text: string): Promise<Array<string>> {
		const urlObject = new URL('/documents/tags', url)
		urlObject.search = new URLSearchParams({ text }).toString()

		const response = await requestUrl({
			url: urlObject.toString(),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})

		if (response.status >= 400) {
			throw new Error(`API call error: ${response.status}`)
		}

		const data = JSON.parse(response.text)
		return data.tags
	}
}
