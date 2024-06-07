import { Notice, Plugin } from 'obsidian'
import { JotterJoyApi } from './Api'
import { OutType, ViewManager } from './ViewManager'
import {
	JotterJoySettingsTab,
	DEFAULT_SETTINGS,
	JotterJoyPluginSettings
} from './SettingsTab'

export default class JotterJoyPlugin extends Plugin {
	settings: JotterJoyPluginSettings
	viewManager = new ViewManager(this.app)
	api = new JotterJoyApi()

	async onload() {
		// settings
		await this.loadSettings()
		this.addSettingTab(new JotterJoySettingsTab(this.app, this))

		// commands
		this.addCommand({
			id: 'generate-tags-at-beginning',
			name: 'Generate Tags at Beginning',
			callback: async () => {
				const noteText = await this.viewManager.getContent()
				if (!noteText) {
					new Notice('No text in note')
					return
				}

				const loadingNotice = this.createLoadingNotice(
					`${this.manifest.name}: Coming up with some tags ...`
				)

				let tags: Array<string> = []
				try {
					tags = await this.api.fetchTags(this.settings, noteText)
					loadingNotice.hide()
				} catch (_err) {
					console.error(_err)
					loadingNotice.hide()
				}

				this.viewManager.insertAtContentTop(tags, OutType.Tag)
			}
		})

		this.addCommand({
			id: 'generate-tags-in-frontmatter',
			name: `Generate Tags in Frontmatter`,
			callback: async () => {
				const noteText = await this.viewManager.getContent()
				if (!noteText) {
					new Notice('No text in note')
					return
				}

				const loadingNotice = this.createLoadingNotice(
					`${this.manifest.name}: Coming up with some tags ...`
				)

				let tags: Array<string> = []
				try {
					tags = await this.api.fetchTags(this.settings, noteText)
					loadingNotice.hide()
				} catch (_err) {
					console.error(_err)
					loadingNotice.hide()
				}

				tags.forEach((tag) => {
					this.viewManager.insertAtFrontMatter(
						this.settings.frontmatterPropertyName,
						tag
					)
				})
			}
		})

		this.addCommand({
			id: 'proofread-note',
			name: `Proofread Note`,
			callback: async () => {
				const noteText = await this.viewManager.getContent()
				if (!noteText) {
					new Notice('No text in note')
					return
				}

				const loadingNotice = this.createLoadingNotice(
					`${this.manifest.name}: Proofreading your text ...`
				)

				let fixedText: string = ''
				try {
					fixedText = await this.api.proofReadNote(this.settings, noteText)
					loadingNotice.hide()
				} catch (_err) {
					console.error(_err)
					loadingNotice.hide()
				}

				if (fixedText.length) {
					try {
						const activeFile = this.viewManager.getActiveMarkdownView()
						await this.app.vault.modify(activeFile.file, fixedText)
					} catch (error) {
						console.error(`Failed to replace text`, error)
					}
				}
			}
		})
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}

	private createLoadingNotice(text: string, number = 10000): Notice {
		const notice = new Notice('', number)
		const loadingContainer = document.createElement('div')
		loadingContainer.addClass('loading-container')

		const loadingIcon = document.createElement('div')
		loadingIcon.addClass('loading-icon')
		const loadingText = document.createElement('span')
		loadingText.textContent = text
		notice.noticeEl.empty()
		loadingContainer.appendChild(loadingIcon)
		loadingContainer.appendChild(loadingText)
		notice.noticeEl.appendChild(loadingContainer)

		return notice
	}
}
