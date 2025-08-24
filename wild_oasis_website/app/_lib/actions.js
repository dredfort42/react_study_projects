'use server';

import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';

export async function updateProfile(formData) {
    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    const national_id = formData.get('national_id');
    const [nationality, country_flag] = formData.get('nationality').split('%');

    if (!/^[a-zA-Z0-9]{5,20}$/.test(national_id))
        throw new Error('Please provide a valid national ID');

    const updateData = { nationality, country_flag, national_id };

    console.log(updateData);

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId);

    if (error) {
        throw new Error('Guest could not be updated');
    }
}

export async function signInAction() {
    await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}
