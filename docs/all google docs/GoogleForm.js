function createSchoolOfEthicsForm() {
  var form = FormApp.create('School of Ethics: Study Consent & Reflection')
    .setDescription('Consent, project background, and post-session reflection questions.')
    .setCollectEmail(false)
    .setShowLinkToRespondAgain(false)
    .setConfirmationMessage('Thank you — your response has been recorded.');

  // PAGE 1: Project background + consent
  form.addSectionHeaderItem()
    .setTitle('About this study')
    .setHelpText(
      '[PLACEHOLDER — project background]\n\n' +
      'This study investigates whether making AI-agent disagreement visible (dissent ' +
      'visibility) helps people make better, less over-reliant ethical decisions when ' +
      'advised by AI. You will be asked to work through a short web-based session in ' +
      'which you respond to an engineering ethics scenario, see advice from AI agents, ' +
      'and make a decision. Afterwards you will return to this form to answer some ' +
      'reflection questions.\n\n' +
      'This research is being conducted as part of a Monash University FIT4701/2 ' +
      'research project. Researcher(s): [PLACEHOLDER NAME(S)]. Supervisor: ' +
      '[PLACEHOLDER NAME]. Contact: [PLACEHOLDER EMAIL]. ' +
      'Monash University Human Research Ethics Committee approval number: [PLACEHOLDER].'
    );

  form.addSectionHeaderItem()
    .setTitle('What participation involves')
    .setHelpText(
      '- Participation is voluntary. You may withdraw at any time without penalty, up ' +
      'until you submit this form, after which your response cannot be identified or ' +
      'removed because it is collected anonymously.\n' +
      '- The session should take about [PLACEHOLDER] minutes in total.\n' +
      '- No identifying information (name, email, student ID) is collected.\n' +
      '- Your responses will be used only for this research project and reported only ' +
      'in de-identified, aggregate form.\n' +
      '- There are no anticipated risks beyond those of normal everyday decision-making ' +
      'reflection. The scenarios are fictional.'
    );

  var consentQ = form.addMultipleChoiceItem();
  consentQ.setTitle('Do you consent to participate in this study?')
    .setRequired(true);

  // PAGE 2: Platform description + link out
  var pagePlatform = form.addPageBreakItem().setTitle('The platform');
  form.addSectionHeaderItem()
    .setTitle('What you\'ll be doing')
    .setHelpText(
      'You will now click a link to an external website. There, you will:\n' +
      '1. Read a short engineering ethics scenario and choose an initial option, with a ' +
      'short written reason.\n' +
      '2. See advice from three AI agents.\n' +
      '3. Confirm or change your decision, with your reasoning again.\n' +
      '4. See a short summary screen.\n\n' +
      'This should take about [PLACEHOLDER] minutes. When you are finished, come back ' +
      'to this browser tab and click "Next" below to continue to the reflection ' +
      'questions.'
    );
  form.addSectionHeaderItem()
    .setTitle('Platform link')
    .setHelpText('[PLACEHOLDER — insert platform URL here]\n\nOpen this link in a new tab so you can return to this form afterwards.');

  // PAGE 3: Demographics
  var pageDemo = form.addPageBreakItem().setTitle('A bit about you');

  form.addMultipleChoiceItem()
    .setTitle('Age range')
    .setChoiceValues(['18–24', '25–34', '35–44', '45–54', '55–64', '65+', 'Prefer not to say'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Current status')
    .setChoiceValues(['Engineering student', 'Early-career engineer (<5 yrs)', 'Experienced engineer (5+ yrs)'])
    .showOtherOption(true)
    .setRequired(true);

  form.addTextItem()
    .setTitle('Engineering discipline (e.g. Civil, Mechanical, Electrical, Software, Chemical)')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Ethnicity (optional — you may leave this blank)')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('How often do you use AI tools (ChatGPT, Copilot, etc.) in your work or study?')
    .setChoiceValues(['Never', 'Rarely', 'Monthly', 'Weekly', 'Daily'])
    .setRequired(true);

  // PAGE 4: Reflection questions
  var pageReflect = form.addPageBreakItem().setTitle('Reflection questions');

  form.addParagraphTextItem()
    .setTitle('What could make the AI agent(s) more trustworthy?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Was visible dissent helpful in how you made your decision? Why or why not?')
    .setHelpText('If you did not notice the AI agents disagreeing, say so — that\'s a useful answer too.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What would help you make a more effective decision in a situation like this?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Did anything about the AI advice make you more or less willing to rely on it?')
    .setRequired(true);

  // PAGE 5: Quality reflection
  var pageQuality = form.addPageBreakItem().setTitle('Quality reflection');

  form.addScaleItem()
    .setTitle('How relevant did the scenario(s) feel compared to actual or perceived situations you\'ve encountered or expect to encounter?')
    .setHelpText('Consider things like ambiguity, transparency, bias, or cultural complexity in the scenario.')
    .setBounds(1, 5)
    .setLabels('Not at all relevant', 'Extremely relevant')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('How easy were the scenario and the AI advice (with dissent visible) to understand?')
    .setHelpText('Consider the clarity, completeness, and comprehensiveness of the AI advice.')
    .setBounds(1, 5)
    .setLabels('Very difficult to understand', 'Very easy to understand')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Any suggestions for improving the scenarios, the AI advice, or the overall flow?')
    .setRequired(false);

  // PAGE 6: Misc
  var pageMisc = form.addPageBreakItem().setTitle('A few more questions');

  form.addParagraphTextItem()
    .setTitle('Did you notice the AI agents disagreeing with each other (dissent)? If so, how did that affect your decision-making process?')
    .setHelpText('If you did not notice any disagreement, please say so.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Did the summary shown at the end of the session help you understand or reflect on your decision?')
    .setChoiceValues(['Yes', 'No', 'Not sure'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('If you answered above, briefly say why / why not (optional)')
    .setRequired(false);

  // PAGE 7: Thank you — exit point for both consenters and non-consenters
  var pageThanks = form.addPageBreakItem().setTitle('Thank you');
  form.addSectionHeaderItem()
    .setTitle('Thank you for your time')
    .setHelpText('Your response has been recorded. You may now close this window.');

  // Wire up consent branching now that both destination pages exist
  consentQ.setChoices([
    consentQ.createChoice('I have read the information above and I consent to participate', pagePlatform),
    consentQ.createChoice('I do not consent to participate', pageThanks),
  ]);

  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Live form link: ' + form.getPublishedUrl());
}