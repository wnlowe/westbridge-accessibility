export interface QuizScore {
  correct: boolean; // selection exactly matches the answer set
  hits: number; // correct options chosen
  total: number; // number of correct options
  extras: number; // options chosen that don't apply
}

/** An answer is correct only if the chosen set exactly equals the correct set (order doesn't matter). */
export function scoreAnswer(chosen: number[], correct: number[]): QuizScore {
  const answer = new Set(correct);
  const picked = new Set(chosen);
  const hits = [...picked].filter((i) => answer.has(i)).length;
  const extras = picked.size - hits;
  return { correct: hits === answer.size && extras === 0, hits, total: answer.size, extras };
}
