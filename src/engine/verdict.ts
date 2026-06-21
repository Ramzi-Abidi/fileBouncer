import type { Severity, Threat, Verdict } from "../types";

const SEVERITY_ORDER: Severity[] = ["info", "low", "medium", "high", "critical"];

const severityRank = (severity: Severity): number => SEVERITY_ORDER.indexOf(severity);

export const meetsThreshold = (severity: Severity, threshold: Severity): boolean =>
  severityRank(severity) >= severityRank(threshold);

export const computeVerdict = (threats: Threat[]): Verdict => {
  if (threats.length === 0) return "clean";

  const worst = threats.reduce(
    (max, t) => (severityRank(t.severity) > severityRank(max) ? t.severity : max),
    threats[0]!.severity,
  );

  if (meetsThreshold(worst, "high")) return "malicious";
  return "suspicious";
};
