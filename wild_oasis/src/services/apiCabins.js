import supabase, { supabaseUrl } from './supabase';

export async function createAndEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image_url?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image_url.name}`.replaceAll(
        '/',
        '_'
    );
    const imagePath = hasImagePath
        ? newCabin.image_url
        : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

    // 1. Create cabim
    let query = supabase.from('cabins');

    // - create
    if (!id) {
        query = query.insert([{ ...newCabin, image_url: imagePath }]);
    }

    // - edit
    if (id) {
        query = query
            .update({ ...newCabin, image_url: imagePath })
            .eq('id', id);
    }

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be created...');
    }

    // 2. Upload image
    const { error: storageError } = await supabase.storage
        .from('cabin_images')
        .upload(imageName, newCabin.image_url);

    // 3. Delete the cabin if there was an error
    if (storageError) {
        deleteCabin(data.id);

        console.error(storageError);
        throw new Error(
            'Cabin image could not be uploaded and the cabin was not created'
        );
    }

    return data;
}

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded...');
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted...');
    }
}
