/**
 * Nuxt 3 Composable: composables/useUserProgress.ts
 * Manages user authentication, purchased course unlocks (Pay-First rule), XP, and streak
 */
declare const useState: <T>(key: string, init?: () => T) => { value: T };

export const useUserProgress = () => {
  const purchasedCourses = useState<string[]>('user_purchased_courses', () => []);
  const streakDays = useState<number>('user_streak', () => 7);
  const xpPoints = useState<number>('user_xp', () => 1850);
  const user = useState('user_profile', () => ({
    name: 'Anvar Rustamov',
    email: 'anvar@frontdev.uz',
    rank: 'Junior Fullstack Dasturchi',
    level: 6,
  }));

  const hasAccess = (courseId: string): boolean => {
    return purchasedCourses.value.includes(courseId);
  };

  const unlockCourse = (courseId: string) => {
    if (!purchasedCourses.value.includes(courseId)) {
      purchasedCourses.value.push(courseId);
      xpPoints.value += 200; // Bonus XP on purchasing new course
    }
  };

  return {
    user,
    purchasedCourses,
    streakDays,
    xpPoints,
    hasAccess,
    unlockCourse,
  };
};
