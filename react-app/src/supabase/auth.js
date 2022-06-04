import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.REACT_APP_SUPABASE_DBURL, process.env.REACT_APP_SUPABASE_API_KEY);

const signInUser = async () => {
  const { user } = await supabase.auth.signIn({
    provider: 'google',
  });

  return user;
};

const signOutUser = async () => {
  await supabase.auth.signOut();
};

const currentUser = () => supabase.auth.user();

export {
  supabase, signInUser, signOutUser, currentUser,
};