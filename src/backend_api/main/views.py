from django.shortcuts import render
from . import serializers
from rest_framework import generics, permissions, pagination,viewsets
from . import serializers
from . import models
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.utils import IntegrityError
# Create your views here.

# Vendor
class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer

class VendorDetail(generics.RetrieveAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer

# Customer
class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer

class CustomerAddressViewSet(viewsets.ModelViewSet):
    queryset = models.CustomerAddress.objects.all()
    serializer_class = serializers.CustomerAddressSerializer

# Product
class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        category_id = self.request.GET.get('category')
        if category_id is not None:
            try:
                category = models.ProductCategory.objects.get(id=category_id)
                qs = qs.filter(category=category)
            except models.ProductCategory.DoesNotExist:
                # Xử lý khi không tìm thấy category với id được cung cấp
                pass
        return qs

class TagProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        tag = self.kwargs['tag']
        qs=qs.filter(tags__icontains=tag)
        return qs  
    
class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs['pk']
        product = models.Product.objects.get(id=product_id)
        qs=qs.filter(category = product.category).exclude(id=product_id)
        return qs  
    
class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer

class ProductRatingViewSet(viewsets.ModelViewSet):
    queryset = models.ProductRating.objects.all()
    serializer_class = serializers.ProductRatingSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer


class CategoryDetail(generics.RetrieveAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer


# Order 
class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

class OrderDetail(generics.ListAPIView):
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        order_id = self.kwargs['pk']
        order = models.Order.objects.get(id=order_id)
        order_items = models.OrderItems.objects.filter(order=order)
        return order_items


@csrf_exempt
def vendor_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    address = request.POST.get('address')
    username = request.POST.get('username')
    password = request.POST.get('password')
    try:
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            username=username,
            password=password,
        )

        if user is not None:
            try:
                vendor = models.Vendor.objects.create(
                    user=user, 
                    mobile=mobile,
                    address=address,
                )
                msg={
                    'bool':True,
                    'user':user.id,
                    'vendor':vendor.id,
                    'msg':'Thank you for registration. You can login now.'
                }
            except IntegrityError:
                msg={
                    'bool':False,
                    'msg':'Mobile number already registered.'
                }
        else:
            msg={
                'bool':False,
                'msg':'Something went wrong.'
            }
            
    except IntegrityError:
        msg={
            'bool':False,
            'msg':'Username already exists.'
        }
        
        
    return JsonResponse(msg)
    


@csrf_exempt
def customer_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    username = request.POST.get('username')
    password = request.POST.get('password')
    try:
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            username=username,
            password=password,
        )
        if user:
            try:
                customer = models.Customer.objects.create(
                    user=user, 
                    mobile=mobile
                )
                msg={
                    'bool':True,
                    'user':user.id,
                    'customer':customer.id,
                    'msg':'Thank you for registration. You can login now.'
                }
            except IntegrityError:
                msg={
                    'bool':False,
                    'msg':'Mobile number already registered.'
                }
        else:
            msg={
                'bool':False,
                'msg':'Something went wrong.'
            }
            
    except IntegrityError:
        msg={
            'bool':False,
            'msg':'Username already exists.'
        }
    return JsonResponse(msg)
    
