import supabase from "../supabase";

export async function uploadImage(pathWithName: string, buffer: Buffer, mimetype: string) {
	const { error, data } = await supabase.storage
		.from('aula-upload')
		.upload(pathWithName, buffer, {
			contentType: mimetype
		})

	if (error) {
		console.log(error)
		return null
	}

	return data.fullPath
}