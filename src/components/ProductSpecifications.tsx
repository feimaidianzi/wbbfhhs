import { useLanguage } from '@/contexts/LanguageContext';

interface SpecField {
  key?: string;
  label: string;
  labelEn?: string;
  value: string;
  valueEn?: string;
  unit?: string;
}

interface ProductSpecificationsProps {
  specifications: SpecField[] | Record<string, string> | null;
  title?: string;
  titleEn?: string;
  className?: string;
}

/**
 * ProductSpecifications - 产品规格参数展示组件
 * 支持数组格式和对象格式的规格数据
 */
const ProductSpecifications = ({
  specifications,
  title = '技术参数',
  titleEn = 'Technical Specifications',
  className = '',
}: ProductSpecificationsProps) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  // Parse specifications into array format
  const parseSpecs = (): SpecField[] => {
    if (!specifications) return [];
    
    if (Array.isArray(specifications)) {
      return specifications.map((spec: any, index) => ({
        key: spec.key || `spec_${index}`,
        label: spec.label || '',
        labelEn: spec.labelEn || '',
        value: spec.value || '',
        valueEn: spec.valueEn || '',
        unit: spec.unit || '',
      }));
    }
    
    // Handle object format (legacy or simple key-value)
    if (typeof specifications === 'object') {
      return Object.entries(specifications).map(([label, value], index) => ({
        key: `spec_${index}`,
        label,
        value: String(value),
        unit: '',
      }));
    }
    
    return [];
  };

  const specs = parseSpecs();

  if (specs.length === 0) {
    return null;
  }

  const getDisplayValue = (spec: SpecField) => {
    const value = isEn && spec.valueEn ? spec.valueEn : spec.value;
    const unit = spec.unit || '';
    return unit ? `${value} ${unit}` : value;
  };

  return (
    <section className={`py-16 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {isEn ? titleEn : title}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-card overflow-hidden border border-border">
          <table className="w-full">
            <tbody>
              {specs.map((spec, index) => (
                <tr
                  key={spec.key || index}
                  className={`${index % 2 === 0 ? 'bg-muted/50' : 'bg-card'} hover:bg-primary/5 transition-colors`}
                >
                  <td className="px-6 py-4 font-medium text-foreground border-b border-border/30 w-1/3">
                    {isEn && spec.labelEn ? spec.labelEn : spec.label}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground border-b border-border/30">
                    {getDisplayValue(spec)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecifications;
