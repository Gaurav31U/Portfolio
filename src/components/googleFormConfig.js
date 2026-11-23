// Google Form backend for the Contact section.
// The portfolio keeps its own UI; submissions are POSTed straight to the form,
// so responses land in Google Forms / the linked Google Sheet.
//
// How to fill this in:
// 1. Create a Google Form with 6 questions, ALL "Short answer" or "Paragraph"
//    (not checkboxes/multiple choice, so any value the site sends is accepted):
//    Name, Email, Project type, Budget, Timeline, Project details.
// 2. Form's ⋮ menu → "Get pre-filled link", type anything in each field, click
//    "Get link". The link looks like:
//    https://docs.google.com/forms/d/e/<FORM_ID>/viewform?entry.111=a&entry.222=b...
// 3. Paste <FORM_ID> below and map each entry.NNN to its field.
// Leave formId empty to fall back to opening the visitor's email app.

export const GOOGLE_FORM = {
  // Form: "Project Brief — Gaurav Kumar Portfolio"
  formId: '1FAIpQLSc0GXL3U7MZiUaTXZZTXEvX5e8QRyhD9FYXRDf_VQ2SGDWCsw',
  fields: {
    name: 'entry.13527747',
    email: 'entry.1254662049',
    projectType: 'entry.1813994212',
    budget: 'entry.1521413067',
    timeline: 'entry.2060624121',
    message: 'entry.1498734575',
  },
};

export const isGoogleFormConfigured = () => Boolean(GOOGLE_FORM.formId);

export const submitToGoogleForm = async (values) => {
  const body = new URLSearchParams();
  Object.entries(GOOGLE_FORM.fields).forEach(([key, entry]) => {
    body.append(entry, values[key] ?? '');
  });
  // Google Forms sends no CORS headers, so the response is opaque. A network
  // failure still rejects, which is what we use to detect errors.
  await fetch(`https://docs.google.com/forms/d/e/${GOOGLE_FORM.formId}/formResponse`, {
    method: 'POST',
    mode: 'no-cors',
    body,
  });
};
