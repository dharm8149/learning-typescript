export const unionsIntroVideo = {
  compositionId: 'IntroUnionStory',
  title: 'The Many Faces of Data — Unions to the Rescue',
  durationSeconds: 45,
  description: 'A story about handling different data shapes in a single function.',
  thumbnailUrl: '/thumbnails/unions-intro.png'
};

export const unionsOutroVideo = {
  compositionId: 'OutroUnionMastery',
  title: 'The Intersection of Power — Mastering Type Composition',
  durationSeconds: 45,
  description: 'A story about combining types for maximum safety and flexibility.',
  thumbnailUrl: '/thumbnails/unions-outro.png'
};

export const unionsVideoConfig = {
  id: 'unions-intersections',
  title: 'Unions and Intersections',
  description: 'Master TypeScript type composition with unions and intersections.',
  modules: ['module-03-unions-intersections'],
  sections: ['section-01-unions-intersections'],
  order: 1,
  durationSeconds: 90,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'active'
};
