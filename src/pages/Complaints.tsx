
// ComplaintsPage.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  date: string;
}

const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Хүний эрхийн хүрэлцээгүй орчин',
    description: 'Дэлгүүрийн орцны хүрэлцээгүй орчин',
    location: 'Салбар 1',
    status: 'in-progress',
    date: '2024-12-01',
  },
  {
    id: '2',
    title: 'Тэсэлгээний систем алдагдсан',
    description: 'Байшинд тэсэлгээний систем алдагдсан',
    location: 'Салбар 2',
    status: 'pending',
    date: '2024-11-01',
  },
  {
    id: '3',
    title: 'Хүний эрхийн хүрэлцээгүй орчин',
    description: 'Рестораны орцны хүрэлцээгүй орчин',
    location: 'Салбар 3',
    status: 'resolved',
    date: '2024-11-01',
  },
];

const getStatusColor = (status: Complaint['status']) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };
  return colors[status];
};

export function ComplaintsPage() {
  const [filter, setFilter] = React.useState<string>('all');

  const filteredComplaints = React.useMemo(() => {
    if (filter === 'all') return mockComplaints;
    return mockComplaints.filter(complaint => complaint.status === filter);
  }, [filter]);

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Илгээсэн санал гомдол</h1>
          <p className="text-gray-600">
            Та өөрийн илгээсэн санал гомдолын мэдээллийг харна уу.
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Нийт</SelectItem>
            <SelectItem value="pending">Хүсэлт илгээгдсэн</SelectItem>
            <SelectItem value="in-progress">Шалгуулагдаж байгаа</SelectItem>
            <SelectItem value="resolved">Шийдвэрлэгдсэн</SelectItem>
            <SelectItem value="rejected">Татгалзсан</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Нийт</CardTitle>
            <CardDescription>Нийт санал гомдол</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mockComplaints.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Шалгуулагдаж байгаа</CardTitle>
            <CardDescription>Нийт шалгуулагдаж байгаа санал гомдол</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {
                mockComplaints.filter(
                  complaint => complaint.status === 'in-progress'
                ).length
              }
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Шийдвэрлэгдсэн</CardTitle>
            <CardDescription>Шийдвэрлэгдсэн нийт санал гомдол</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {
                mockComplaints.filter(
                  complaint => complaint.status === 'resolved'
                ).length
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          {/* <CardTitle>Complaints List</CardTitle>
          <CardDescription>
            View and manage your submitted complaints
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map(complaint => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{complaint.title}</p>
                      <p className="text-sm text-gray-500">
                        {complaint.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{complaint.location}</TableCell>
                  <TableCell>
                    {new Date(complaint.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(complaint.status)}>
                      {complaint.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}