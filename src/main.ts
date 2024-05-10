import {
	App,
	Plugin,
	PluginSettingTab,
	Setting,
	addIcon,
} from 'obsidian';

import {
	DUPLICATE_LINES_ICON,
} from 'utils/constants';



interface MobileUtilsSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MobileUtilsSettings = {
	mySetting: 'default'
}



export default class MobileUtilsPlugin extends Plugin {
	settings: MobileUtilsSettings;

	async onload() {
		await this.loadSettings();

		addIcon('arrows-down-from-line-to-line', DUPLICATE_LINES_ICON);

		this.addCommand({
			id: 'duplicate-line',
			name: 'Duplicate Line',
			icon: 'arrows-down-from-line-to-line',
			editorCallback: (editor) => {
				const cursor = editor.getCursor();
				const line = editor.getLine(cursor.line);
				editor.replaceRange(line + '\n', {line: cursor.line, ch: 0});
			}
		});

		// this.addSettingTab(new MobileUtilsSettingTab(this.app, this));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

}



class MobileUtilsSettingTab extends PluginSettingTab {
	plugin: MobileUtilsPlugin;

	constructor(app: App, plugin: MobileUtilsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}

}
