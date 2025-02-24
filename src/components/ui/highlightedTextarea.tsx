import * as React from "react"
import { cn } from "../../lib/utils"

interface HighlightedTextareaProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const HighlightedTextarea = React.forwardRef<HTMLTextAreaElement, HighlightedTextareaProps>(
  ({ value, onChange, className }, ref) => {
    // Handle changes and maintain the {{}} in the actual value
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      // When user types in the highlighted version, we need to add back the brackets
      const withBrackets = newValue.replace(/\u200B(.*?)\u200B/g, '{{$1}}');
      onChange(withBrackets);
    };

    // Remove brackets but keep the content with zero-width spaces as markers
    const displayValue = value.replace(/\{\{(.*?)\}\}/g, '\u200B$1\u200B');

    return (
      <div className={cn("relative h-full w-full text-sm", className)}>
        <style>
          {`
            .highlight-variables {
              background: white;
            }
            .highlight-variables::selection {
              background: #bfdbfe;
            }
            .highlight-variables \u200B {
              display: inline;
            }
            .highlight-variables \u200B + :not(\u200B) {
              background: #bfdbfe;
              border-radius: 2px;
              padding: 0 2px;
              margin: 0 1px;
            }
            .highlight-variables \u200B + :not(\u200B) + \u200B {
              display: none;
            }
          `}
        </style>
        <textarea
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          className="w-full h-full resize-none p-2 bg-white text-black focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-300 rounded-md highlight-variables"
        />
      </div>
    );
  }
);

HighlightedTextarea.displayName = "HighlightedTextarea";

export { HighlightedTextarea };
export type { HighlightedTextareaProps };
