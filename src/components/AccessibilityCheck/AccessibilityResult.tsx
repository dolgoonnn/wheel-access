import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface AccessibilityResultProps {
  score: number;
  issues: string[];
  recommendations?: string[];
}

export function AccessibilityResult({ score, issues = [], recommendations = [] }: AccessibilityResultProps) {
  const getResultContent = () => {
    if (score >= 0.8) {
      return {
        icon: <CheckCircle className="w-8 h-8 text-green-500" />,
        title: "Зорчиход асуудалгүй",
        description: "Тэргэнцэртэй хүнд тохиромжтой зам",
        className: "bg-green-50 border-green-200",
      };
    } else if (score >= 0.5) {
      return {
        icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
        title: "Тохиромжтой",
        description: "Бага зэрэг асуудал гарах боломжтой.",
        className: "bg-yellow-50 border-yellow-200",
      };
    } else {
      return {
        icon: <XCircle className="w-8 h-8 text-red-500" />,
        title: "Тохиромжгүй",
        description: "Тэргэнцэртэй хүмүүст хүндрэлтэй.",
        className: "bg-red-50 border-red-200",
      };
    }
  };

  const content = getResultContent();

  return (
    <div className={`rounded-lg border p-6 ${content.className}`}>
      <div className="flex items-center gap-4 mb-4">
        {content.icon}
        <div>
          <h3 className="text-lg font-semibold">{content.title}</h3>
          <p className="text-gray-600">{content.description}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-700">
            Тохиромжтой байх магадлал:
          </span>
          <span className="ml-2 text-lg font-bold">
            {Math.round(score * 100)}%
          </span>
        </div>
        
        {issues.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Илрүүлсэн асуудал:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {issues.map((issue, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {recommendations && recommendations.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Зөвлөмж:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}