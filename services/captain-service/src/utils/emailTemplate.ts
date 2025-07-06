export const getApprovalEmailTemplate = (name: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2 style="color: #00b386;">🎉 You're Approved, ${name}!</h2>
    <p>Welcome aboard to <strong>Grovia</strong>!</p>
    <p>Your captain profile has been reviewed and approved. You're now officially a part of our delivery network.</p>
    <p>🚀 Get ready to deliver fresh groceries to happy customers near you.</p>

    <hr style="margin: 20px 0;" />

    <p>Have questions? Reach out to our support team any time.</p>

    <p style="margin-top: 30px;">Cheers,<br><strong>Team Grovia</strong></p>
  </div>
`;
