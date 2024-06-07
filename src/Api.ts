import { requestUrl } from 'obsidian'
import { JotterJoyPluginSettings } from './SettingsTab'

export class JotterJoyApi {
	async fetchTags(
		settings: JotterJoyPluginSettings,
		text: string
	): Promise<Array<string>> {
		const urlObject = new URL('/documents/tags', settings.apiUrl)
		urlObject.search = new URLSearchParams({ text }).toString()

		const response = await requestUrl({
			url: urlObject.toString(),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				model: settings.model
			})
		})

		if (response.status >= 400) {
			throw new Error(`API call error: ${response.status}`)
		}

		const data = JSON.parse(response.text)
		return data.tags
	}

	async proofReadNote(
		settings: JotterJoyPluginSettings,
		text: string
	): Promise<string> {
		const urlObject = new URL('/documents/fix-text', settings.apiUrl)
		urlObject.search = new URLSearchParams({ text }).toString()

		const response = await requestUrl({
			url: urlObject.toString(),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				model: settings.model
			})
		})

		if (response.status >= 400) {
			throw new Error(`API call error: ${response.status}`)
		}

		const data = JSON.parse(response.text)
		return data.fixed_text
	}
}
