// Jian, Bisantz & Drury (2000) 12-item trust-in-automation checklist,
// adapted to refer to "the AI advisor panel". Items 1-5 are worded toward
// distrust and must be reverse-scored before averaging into a composite.
export const trustScaleVersion = 'jian-2000-12-item'

export const trustScaleItems = [
  { id: 't1', text: 'The AI advisor panel is deceptive.', reverseScored: true },
  { id: 't2', text: 'The AI advisor panel behaves in an underhanded manner.', reverseScored: true },
  { id: 't3', text: "I am suspicious of the AI advisor panel's intent, actions, or outputs.", reverseScored: true },
  { id: 't4', text: 'I am wary of the AI advisor panel.', reverseScored: true },
  { id: 't5', text: "The AI advisor panel's actions will have a harmful or injurious outcome.", reverseScored: true },
  { id: 't6', text: 'I am confident in the AI advisor panel.', reverseScored: false },
  { id: 't7', text: 'The AI advisor panel provides security.', reverseScored: false },
  { id: 't8', text: 'The AI advisor panel has integrity.', reverseScored: false },
  { id: 't9', text: 'The AI advisor panel is dependable.', reverseScored: false },
  { id: 't10', text: 'The AI advisor panel is reliable.', reverseScored: false },
  { id: 't11', text: 'I can trust the AI advisor panel.', reverseScored: false },
  { id: 't12', text: 'I am familiar with the AI advisor panel.', reverseScored: false },
]

const SCALE_MIN = 1
const SCALE_MAX = 7

// Reverse-codes items 1-5, then averages all 12 into a single 1-7 composite
// where higher always means more trust.
export function scoreTrustResponses(responses) {
  const scored = trustScaleItems.map(item => {
    const value = responses[item.id]
    return item.reverseScored ? (SCALE_MIN + SCALE_MAX) - value : value
  })
  return scored.reduce((sum, value) => sum + value, 0) / scored.length
}
