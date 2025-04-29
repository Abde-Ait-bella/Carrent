import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

// Interface pour l'état utilisateur
interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    role: string | null;
    autenticated: boolean;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

// État initial
const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    role: null,
    autenticated: false,
    token: null,
    isLoading: false,
    error: null,
};

// Action asynchrone pour récupérer l'ID utilisateur depuis les cookies
export const fetchUserData = createAsyncThunk(
    'user/fetchUserIdFromCookie',
    async (_, { rejectWithValue }) => {
        try {
            
            const id = Cookies.get('user_id') ;
            const name = Cookies.get('user_name') ;
            const email = Cookies.get('user_email') ;
            const role = Cookies.get('user_role') ;
            const token = Cookies.get('user_token') ;
            const autenticated = Cookies.get('AUTHENTICATED') ;
            
            const userData = { id, name, email, role, token, autenticated };

            if (!id) {
                return rejectWithValue('ID utilisateur non trouvé dans les cookies');
            }

            return userData;
        } catch (error) {
            return rejectWithValue('Erreur lors de la récupération de l\'ID utilisateur');
        }
    }
);

// Création du Slice Redux
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Action pour définir manuellement les informations utilisateur
        setUserData: (state, action: PayloadAction<{id: string, name: string, email: string, role: string, token: string , autenticated: boolean, remember: boolean}>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.autenticated = action.payload.autenticated;

            if (action.payload.remember) {
                Cookies.set('user_id', action.payload.id, { expires: 7 }); // expire dans 7 jours
                Cookies.set('user_name', action.payload.name, { expires: 7 });
                Cookies.set('user_email', action.payload.email, { expires: 7 });
                Cookies.set('user_role', action.payload.role, { expires: 7 });
                Cookies.set('user_token', action.payload.token, { expires: 7 });
                Cookies.set('AUTHENTICATED', String(true), { expires: 7, secure: true })
            }else{
                Cookies.set('user_id', action.payload.id);
                Cookies.set('user_name', action.payload.name);
                Cookies.set('user_email', action.payload.email);
                Cookies.set('user_role', action.payload.role);
                Cookies.set('user_token', action.payload.token);
                Cookies.set('AUTHENTICATED', String(true), { secure: true });
            }

        },
        // Action pour déconnecter l'utilisateur
        clearUserData: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.role = null;
            state.token = null;
            state.autenticated = false;

            Cookies.remove('user_id');
            Cookies.remove('user_name');
            Cookies.remove('user_email');
            Cookies.remove('user_role');
            Cookies.remove('user_token');
            Cookies.remove('AUTHENTICATED');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.id = action.payload.id || null;
                state.name = action.payload.name || null;
                state.email = action.payload.email || null;
                state.role = action.payload.role || null;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Export des actions
export const { setUserData, clearUserData } = userSlice.actions;

// Export du reducer
export default userSlice.reducer;