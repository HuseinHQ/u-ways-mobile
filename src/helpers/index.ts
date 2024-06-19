export function validateEmailUPN(email: string) {
  const domain = '.upnjatim.ac.id';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation

  if (typeof email !== 'string') {
    return false;
  }

  return emailRegex.test(email) && email.endsWith(domain);
}
