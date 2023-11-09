import { formatDistanceToNow } from "date-fns";

export function dateDistanceNow(date: Date) {
  return formatDistanceToNow(date);
}
