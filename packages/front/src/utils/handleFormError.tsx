export const handleFormError = (errors: Record<string, any>) => {
  const newErrors: Record<string, any> = {};

  for (const [key, values] of Object.entries(errors)) {
    newErrors[key] = values.map((value: string) => <div key="value">{value}</div>);
  }

  return newErrors;
};
