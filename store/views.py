from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        return {'request': self.request}
        

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer