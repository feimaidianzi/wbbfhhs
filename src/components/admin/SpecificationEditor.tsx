import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface SpecField {
  key: string;
  label: string;
  value: string;
  unit?: string;
}

interface SpecificationEditorProps {
  specifications: SpecField[];
  onChange: (specs: SpecField[]) => void;
  templates?: { id: string; name: string; fields: SpecField[] }[];
  onApplyTemplate?: (templateId: string) => void;
}

const SpecificationEditor = ({
  specifications,
  onChange,
  templates = [],
  onApplyTemplate,
}: SpecificationEditorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const addField = () => {
    onChange([
      ...specifications,
      { key: `field_${Date.now()}`, label: '', value: '', unit: '' },
    ]);
  };

  const removeField = (index: number) => {
    const newSpecs = [...specifications];
    newSpecs.splice(index, 1);
    onChange(newSpecs);
  };

  const updateField = (index: number, updates: Partial<SpecField>) => {
    const newSpecs = [...specifications];
    newSpecs[index] = { ...newSpecs[index], ...updates };
    onChange(newSpecs);
  };

  const handleApplyTemplate = () => {
    if (selectedTemplate && onApplyTemplate) {
      onApplyTemplate(selectedTemplate);
      setSelectedTemplate('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-white">规格参数</Label>
        {templates.length > 0 && (
          <div className="flex items-center gap-2">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white h-8 text-sm">
                <SelectValue placeholder="选择模板" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {templates.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleApplyTemplate}
              disabled={!selectedTemplate}
              className="border-slate-600 text-slate-300 hover:text-white h-8"
            >
              应用
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {specifications.map((spec, index) => (
          <div
            key={spec.key}
            className="flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg"
          >
            <GripVertical className="w-4 h-4 text-slate-500 cursor-move flex-shrink-0" />
            <Input
              value={spec.label}
              onChange={(e) => updateField(index, { label: e.target.value })}
              placeholder="参数名称"
              className="flex-1 bg-slate-700 border-slate-600 h-8 text-sm"
            />
            <Input
              value={spec.value}
              onChange={(e) => updateField(index, { value: e.target.value })}
              placeholder="参数值"
              className="flex-1 bg-slate-700 border-slate-600 h-8 text-sm"
            />
            <Input
              value={spec.unit || ''}
              onChange={(e) => updateField(index, { unit: e.target.value })}
              placeholder="单位"
              className="w-20 bg-slate-700 border-slate-600 h-8 text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeField(index)}
              className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addField}
        className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        添加规格参数
      </Button>
    </div>
  );
};

export default SpecificationEditor;
