export interface AuthState {
  isAuthenticated: boolean;
  token?: string | null;
  username?: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  username: string;
}

export type Prompt = {
  id: number;
  prompt_text: string;
  win_count: number;
};

export type Question = {
  id: number;
  question_text: string;
  prompts: Prompt[];
};
