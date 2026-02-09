import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';
import { MultiLanguageSEO } from '@/components/MultiLanguageSEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Grid3X3, List, Search, Loader2, Star, ImageOff, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  name_en: string | null;
  description: string | null;
  description_en: string | null;
  category: string;
  subcategory: string | null;
  price: number | null;
  original_price: number | null;
  images: string[] | null;
  is_featured: boolean | null;
}

const ITEMS_PER_PAGE = 12;

const DatabaseProductList = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const CATEGORIES = [
    { value: 'all', labelKey: 'productList.category.all' },
    { value: 'multi-rotor', labelKey: 'productList.category.multiRotor' },
    { value: 'vtx', labelKey: 'productList.category.vtx' },
    { value: 'fc-esc', labelKey: 'productList.category.fcEsc' },
    { value: 'gimbal', labelKey: 'productList.category.gimbal' },
    { value: 'camera', labelKey: 'productList.category.camera' },
    { value: 'digital-fpv', labelKey: 'productList.category.digitalFpv' },
    { value: 'elrs', labelKey: 'productList.category.elrs' },
    { value: 'tethered', labelKey: 'productList.category.tethered' },
    { value: 'logistics', labelKey: 'productList.category.logistics' },
    { value: 'airport', labelKey: 'productList.category.airport' },
    { value: 'other-accessories', labelKey: 'productList.category.others' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, name_en, description, description_en, category, subcategory, price, original_price, images, is_featured')
          .eq('is_published', true)
          .order('is_featured', { ascending: false })
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'all' 
      ? products 
      : products.filter(p => p.category === activeCategory);
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(search) ||
        (p.name_en && p.name_en.toLowerCase().includes(search)) ||
        (p.description && p.description.toLowerCase().includes(search)) ||
        (p.description_en && p.description_en.toLowerCase().includes(search))
      );
    }
    return result;
  }, [products, activeCategory, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('ellipsis');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  const getProductName = (p: Product) => isEn && p.name_en ? p.name_en : p.name;
  const getProductDescription = (p: Product) => isEn && p.description_en ? p.description_en : p.description;

  return (
    <>
      <MultiLanguageSEO
        title={t('productList.seo.title')}
        description={t('productList.seo.description')}
        path="/products"
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {t('productList.hero.title')}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t('productList.hero.subtitle')}
              </p>
              
              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('productList.searchPlaceholder')}
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-muted/30 border-y border-border sticky top-16 z-40 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.value
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-card text-muted-foreground hover:bg-accent/10 hover:text-foreground'
                  }`}
                >
                  {t(cat.labelKey)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-muted-foreground">
                {t('productList.showing')}{' '}
                <span className="text-foreground font-semibold">{filteredProducts.length}</span>{' '}
                {t('productList.products')}
                {totalPages > 1 && (
                  <span className="ml-2">
                    ({t('productList.page')} {currentPage}/{totalPages})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}
                >
                  <Grid3X3 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  {t('productList.noProducts')}
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/detail/${product.id}`}
                    className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative bg-muted">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={getProductName(product)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ImageOff className="w-12 h-12" />
                        </div>
                      )}
                      {product.is_featured && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {t('productDetail.featured')}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        {product.subcategory && (
                          <Badge variant="secondary" className="text-xs">
                            {product.subcategory}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {getProductName(product)}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {getProductDescription(product) || t('productList.noDescription')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/detail/${product.id}`}
                    className="group flex gap-6 bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all border border-border"
                  >
                    <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={getProductName(product)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ImageOff className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {product.is_featured && (
                          <Badge className="bg-amber-500/20 text-amber-600 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            {t('productDetail.featured')}
                          </Badge>
                        )}
                        {product.subcategory && (
                          <Badge variant="secondary" className="text-xs">
                            {product.subcategory}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
                        {getProductName(product)}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-1 mt-1">
                        {getProductDescription(product) || t('productList.noDescription')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-10 w-10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {getPageNumbers().map((page, index) => 
                  page === 'ellipsis' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">...</span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      onClick={() => goToPage(page)}
                      className="h-10 w-10"
                    >
                      {page}
                    </Button>
                  )
                )}
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <FloatingContact />
      <Footer />
    </>
  );
};

export default DatabaseProductList;
