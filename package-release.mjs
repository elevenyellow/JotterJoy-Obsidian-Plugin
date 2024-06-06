import AdmZip from 'adm-zip'

const FILES_IN_RELEASE = ['main.js', 'manifest.json', 'README.md']

// https://www.digitalocean.com/community/tutorials/how-to-work-with-zip-files-in-node-js
async function createReleaseZip() {
	try {
		const zip = new AdmZip()

		FILES_IN_RELEASE.forEach((fileName) =>
			zip.addLocalFile(`${process.cwd()}/${fileName}`)
		)

		const outputFile = 'release.zip'
		zip.writeZip(outputFile)
		console.log(`Created ${outputFile} successfully`)
	} catch (e) {
		console.log(`Something went wrong. ${e}`)
	}
}

createReleaseZip()
