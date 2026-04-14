export function useSupabaseSync() {
  return {
    mode: 'demo' as const,
    save: async () => {
      return { ok: true }
    }
  }
}
