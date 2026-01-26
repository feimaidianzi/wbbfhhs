import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  AreaChart, Area
} from 'recharts';
import { Globe, Monitor, Clock } from 'lucide-react';

interface VisitorSession {
  traffic_source: string;
  device_type: string;
  first_visit_at: string;
}

interface VisitorChartsProps {
  sessions: VisitorSession[];
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const trafficSourceLabels: Record<string, string> = {
  direct: '直接访问',
  search_engine: '搜索引擎',
  social_media: '社交媒体',
  referral: '外部链接',
};

const deviceLabels: Record<string, string> = {
  desktop: '桌面端',
  mobile: '移动端',
  tablet: '平板',
};

export default function VisitorCharts({ sessions }: VisitorChartsProps) {
  // 来源分布数据
  const sourceData = useMemo(() => {
    const counts: Record<string, number> = {};
    sessions.forEach(s => {
      const source = s.traffic_source || 'direct';
      counts[source] = (counts[source] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name: trafficSourceLabels[name] || name,
      value,
    }));
  }, [sessions]);

  // 设备类型数据
  const deviceData = useMemo(() => {
    const counts: Record<string, number> = {};
    sessions.forEach(s => {
      const device = s.device_type || 'desktop';
      counts[device] = (counts[device] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name: deviceLabels[name] || name,
      value,
    }));
  }, [sessions]);

  // 时段热力图数据 (按小时统计)
  const hourlyData = useMemo(() => {
    const hourCounts: number[] = Array(24).fill(0);
    sessions.forEach(s => {
      const hour = new Date(s.first_visit_at).getHours();
      hourCounts[hour]++;
    });
    return hourCounts.map((count, hour) => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      visitors: count,
    }));
  }, [sessions]);

  // 自定义Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
          <p className="text-sm font-medium">{payload[0].payload.name || payload[0].payload.hour}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].name || '数量'}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 来源分布饼图 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Globe className="h-4 w-4" />
            访客来源分布
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            {sourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {sourceData.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        stroke="hsl(var(--background))"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                暂无数据
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {sourceData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-1 text-xs">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 设备类型饼图 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            设备类型占比
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            {deviceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {deviceData.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[(index + 2) % COLORS.length]} 
                        stroke="hsl(var(--background))"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                暂无数据
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {deviceData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-1 text-xs">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[(index + 2) % COLORS.length] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 访问时段热力图 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="h-4 w-4" />
            访问时段分布
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="hour" 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  interval={3}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorVisitors)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-2">
            按小时统计访客数量
          </div>
        </CardContent>
      </Card>
    </div>
  );
}