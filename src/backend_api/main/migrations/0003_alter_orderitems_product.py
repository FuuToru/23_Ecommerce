# Generated by Django 5.0.4 on 2024-05-08 17:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_order_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitems',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_items', to='main.product'),
        ),
    ]