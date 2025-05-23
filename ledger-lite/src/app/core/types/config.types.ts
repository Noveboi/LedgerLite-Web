export enum SystemTheme {
    Light,
    Dark
};

export class UserSettings {
    systemTheme: SystemTheme = SystemTheme.Light;
    accessToken: string | null = null;
    refreshToken: string | null = null;    
};