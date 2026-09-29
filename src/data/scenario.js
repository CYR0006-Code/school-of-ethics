export const scenario = {
  id: 'faulty-sensor-deadline',
  title: 'The Faulty Sensor Deadline',
  description:
    "You're a senior engineer on a self-driving vehicle team. Testing reveals " +
    'the obstacle-detection sensor has a rare failure mode (roughly 1 in 50,000 ' +
    'miles) that can delay emergency braking by half a second in heavy rain. A ' +
    'proper fix needs six more weeks, but the launch is contractually locked for ' +
    'next week and delaying it triggers major financial penalties and layoffs.',
  options: [
    { id: 'A', label: 'Delay the launch until the sensor issue is fully fixed.' },
    {
      id: 'B',
      label:
        'Launch on schedule, but disable autonomous mode in heavy rain until the fix ships.',
    },
    { id: 'C', label: 'Launch on schedule as planned; fix the sensor in the next quarterly update.' },
    {
      id: 'D',
      label:
        'Escalate to legal/executive leadership and refuse to sign off until an independent safety review is done.',
    },
  ],
}
